import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

// Mock the necessary props and data
const tableTitle = 'Test Table';
const tableColumns = [
  { description: 'Column 1', name: 'column1' },
  { description: 'Column 2', name: 'column2' },
];
const tableRows = [
  { column1: 'Row 1 Data 1', column2: 'Row 1 Data 2' },
  { column1: 'Row 2 Data 1', column2: 'Row 2 Data 2' },
];
const totalRowCount = 2;
const pagination = { limit: 10, offset: 0 };
const isLoading = false;

describe('Wallets List page', function () {
  it('renders the table component with correct title', () => {
    render(
      <Table
        tableTitle={tableTitle}
        tableColumns={tableColumns}
        tableRows={tableRows}
        totalRowCount={totalRowCount}
        pagination={pagination}
        setPagination={() => {}}
        isLoading={isLoading}
      />
    );

    // Check if the table title is present in the rendered component
    expect(screen.getByText(tableTitle)).toBeInTheDocument();
  });

  it('renders the table headers correctly', () => {
    render(
      <Table
        tableTitle={tableTitle}
        tableColumns={tableColumns}
        tableRows={tableRows}
        totalRowCount={totalRowCount}
        pagination={pagination}
        setPagination={() => {}}
        isLoading={isLoading}
      />
    );

    // Check if all table column headers are present
    tableColumns.forEach((column) => {
      expect(screen.getByText(column.description)).toBeInTheDocument();
    });
  });

  it('renders table rows correctly', () => {
    render(
      <Table
        tableTitle={tableTitle}
        tableColumns={tableColumns}
        tableRows={tableRows}
        totalRowCount={totalRowCount}
        pagination={pagination}
        setPagination={() => {}}
        isLoading={isLoading}
      />
    );

    // Check if all table data rows are present
    tableRows.forEach((row) => {
      expect(screen.getByText(row.column1)).toBeInTheDocument();
      expect(screen.getByText(row.column2)).toBeInTheDocument();
    });
  });
});
