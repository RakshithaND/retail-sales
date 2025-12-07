# Backend (Retail Sales Management)

## Requirements
- Node 18+ recommended
- npm

## Setup
1. Install dependencies:
   npm install

2. Place your CSV file in the project root or provide its path.
   Example: repo root contains `truestate_assignment_dataset.csv` (you already uploaded it).

3. Seed the SQLite database (this may take time for 1M rows):
   # from backend/ folder
   node src/seed.js ../truestate_assignment_dataset.csv

   The script creates `backend/data.db`.

4. Start the server:
   node src/index.js

5. API endpoints:
   GET http://localhost:5000/api/sales
     - Query params: q, page, pageSize, sort (e.g. sort=date:desc), sortField, sortOrder,
       customerRegion (repeatable), gender (repeatable), productCategory (repeatable),
       tags (repeatable or comma-separated), paymentMethod (repeatable),
       ageMin, ageMax, dateFrom, dateTo

   GET http://localhost:5000/api/meta
     - Returns distinct lists for filter UI.
