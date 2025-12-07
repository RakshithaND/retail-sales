// backend/src/seed.js
import.meta.env.VITE_API_URL

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const db = require('./db');

const BATCH_SIZE = 1000;

function createSchema() {
  // customers, products, stores, employees, sales
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT,
      phone TEXT,
      gender TEXT,
      age INTEGER,
      region TEXT,
      type TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT,
      brand TEXT,
      category TEXT,
      tags TEXT
    );

    CREATE TABLE IF NOT EXISTS stores (
      id TEXT PRIMARY KEY,
      location TEXT
    );

    CREATE TABLE IF NOT EXISTS employees (
      id TEXT PRIMARY KEY,
      name TEXT
    );

    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      date TEXT,
      customer_id TEXT,
      product_id TEXT,
      store_id TEXT,
      employee_id TEXT,
      quantity INTEGER,
      price_per_unit REAL,
      discount_percentage REAL,
      total_amount REAL,
      final_amount REAL,
      payment_method TEXT,
      order_status TEXT,
      delivery_type TEXT,
      FOREIGN KEY(customer_id) REFERENCES customers(id),
      FOREIGN KEY(product_id) REFERENCES products(id),
      FOREIGN KEY(store_id) REFERENCES stores(id),
      FOREIGN KEY(employee_id) REFERENCES employees(id)
    );

    CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date);
    CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(name);
    CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    CREATE INDEX IF NOT EXISTS idx_sales_payment ON sales(payment_method);
  `);
}

async function seedFromCsv(csvPath) {
  console.log('Seeding from CSV:', csvPath);
  createSchema();

  const insertCustomer = db.prepare(`
    INSERT OR IGNORE INTO customers (id, name, phone, gender, age, region, type)
    VALUES (@id, @name, @phone, @gender, @age, @region, @type)
  `);

  const insertProduct = db.prepare(`
    INSERT OR IGNORE INTO products (id, name, brand, category, tags)
    VALUES (@id, @name, @brand, @category, @tags)
  `);

  const insertStore = db.prepare(`
    INSERT OR IGNORE INTO stores (id, location)
    VALUES (@id, @location)
  `);

  const insertEmployee = db.prepare(`
    INSERT OR IGNORE INTO employees (id, name)
    VALUES (@id, @name)
  `);

  const insertSale = db.prepare(`
    INSERT OR REPLACE INTO sales (
      id, date, customer_id, product_id, store_id, employee_id,
      quantity, price_per_unit, discount_percentage, total_amount, final_amount,
      payment_method, order_status, delivery_type
    ) VALUES (
      @id, @date, @customer_id, @product_id, @store_id, @employee_id,
      @quantity, @price_per_unit, @discount_percentage, @total_amount, @final_amount,
      @payment_method, @order_status, @delivery_type
    )
  `);

  const fileStream = fs.createReadStream(csvPath);
  const parser = parse({ columns: true, skip_empty_lines: true, relax_quotes: true });

  let batch = [];
  let rowCount = 0;

  const insertBatch = (batchToInsert) => {
    const tx = db.transaction((rows) => {
      for (const r of rows) {
        // upsert customer/product/store/employee (INSERT OR IGNORE)
        insertCustomer.run({
          id: r.customerId,
          name: r.customerName,
          phone: r.phoneNumber,
          gender: r.gender,
          age: r.ageInt,
          region: r.customerRegion,
          type: r.customerType
        });

        insertProduct.run({
          id: r.productId,
          name: r.productName,
          brand: r.brand,
          category: r.productCategory,
          tags: r.tags
        });

        insertStore.run({
          id: r.storeId,
          location: r.storeLocation
        });

        insertEmployee.run({
          id: r.employeeId,
          name: r.employeeName
        });

        // insert sale
        insertSale.run({
          id: r.transactionId,
          date: r.dateIS0,
          customer_id: r.customerId,
          product_id: r.productId,
          store_id: r.storeId,
          employee_id: r.employeeId,
          quantity: r.quantityInt,
          price_per_unit: r.pricePerUnitFloat,
          discount_percentage: r.discountPercentageFloat,
          total_amount: r.totalAmountFloat,
          final_amount: r.finalAmountFloat,
          payment_method: r.paymentMethod,
          order_status: r.orderStatus,
          delivery_type: r.deliveryType
        });
      }
    });
    tx(batchToInsert);
  };

  parser.on('readable', () => {
    let record;
    while ((record = parser.read())) {
      // Map CSV columns to normalized fields (trim keys to exact header names)
      // Expect column names exactly as in header. Defensive parsing.
      const rec = {
        transactionId: (record['Transaction ID'] || record['TransactionId'] || '').trim() || `tx-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        dateIS0: (record['Date'] || '').trim(),
        customerId: (record['Customer ID'] || '').trim() || `CUST-${(record['Phone Number']||'').trim()}`,
        customerName: (record['Customer Name'] || '').trim(),
        phoneNumber: (record['Phone Number'] || '').trim(),
        gender: (record['Gender'] || '').trim(),
        ageInt: record['Age'] ? parseInt(record['Age'], 10) : null,
        customerRegion: (record['Customer Region'] || '').trim(),
        customerType: (record['Customer Type'] || '').trim(),
        productId: (record['Product ID'] || '').trim() || `PROD-${(record['Product Name']||'').trim().slice(0,10)}`,
        productName: (record['Product Name'] || '').trim(),
        brand: (record['Brand'] || '').trim(),
        productCategory: (record['Product Category'] || '').trim(),
        tags: (record['Tags'] || '').trim(),
        quantityInt: record['Quantity'] ? parseInt(record['Quantity'], 10) : 0,
        pricePerUnitFloat: record['Price per Unit'] ? parseFloat(record['Price per Unit']) : 0,
        discountPercentageFloat: record['Discount Percentage'] ? parseFloat(record['Discount Percentage']) : 0,
        totalAmountFloat: record['Total Amount'] ? parseFloat(record['Total Amount']) : 0,
        finalAmountFloat: record['Final Amount'] ? parseFloat(record['Final Amount']) : 0,
        paymentMethod: (record['Payment Method'] || '').trim(),
        orderStatus: (record['Order Status'] || '').trim(),
        deliveryType: (record['Delivery Type'] || '').trim(),
        storeId: (record['Store ID'] || '').trim() || `STORE-${(record['Store Location']||'').trim().slice(0,6)}`,
        storeLocation: (record['Store Location'] || '').trim(),
        employeeId: (record['Salesperson ID'] || record['SalespersonID'] || '').trim() || `EMP-${Math.random().toString(36).slice(2,8)}`,
        employeeName: (record['Employee Name'] || '').trim()
      };

      batch.push(rec);
      rowCount++;

      if (batch.length >= BATCH_SIZE) {
        insertBatch(batch);
        console.log(`Inserted ${rowCount} rows...`);
        batch = [];
      }
    }
  });

  parser.on('end', () => {
    if (batch.length) {
      insertBatch(batch);
      console.log(`Inserted final batch, total rows: ${rowCount}`);
    }
    console.log('CSV seed complete.');
    db.close();
  });

  parser.on('error', (err) => {
    console.error('CSV parse error:', err);
  });

  fileStream.pipe(parser);
}

// Run as script: node src/seed.js <path-to-csv>
if (require.main === module) {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: node src/seed.js <csv-path>');
    process.exit(1);
  }
  const csvPath = path.isAbsolute(input) ? input : path.join(__dirname, '..', input);
  if (!fs.existsSync(csvPath)) {
    console.error('CSV not found:', csvPath);
    process.exit(1);
  }
  seedFromCsv(csvPath);
}

module.exports = { seedFromCsv };
