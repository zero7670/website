import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TaxesTableItem {
  name: string;
  id: number;
  statesTaxRate: number;
  localTaxRate: number;
  editable?: boolean;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TaxesTableItem[] = [
  {id: 1, name: 'Alabama', statesTaxRate: 4.00, localTaxRate: 5.24 },
  {id: 2, name: 'Alaska', statesTaxRate: 0.00, localTaxRate: 1.76 },
  {id: 3, name: 'Arizona', statesTaxRate: 5.60, localTaxRate: 2.77},
  {id: 4, name: 'Arkansas', statesTaxRate: 6.50, localTaxRate: 2.97},
  {id: 5, name: 'California', statesTaxRate: 7.25, localTaxRate: 1.57},
  {id: 6, name: 'Colorado', statesTaxRate: 2.90, localTaxRate: 4.87},
  {id: 7, name: 'Connecticut', statesTaxRate: 6.35, localTaxRate: 0.00},
  {id: 8, name: 'D.C.', statesTaxRate: 6.00, localTaxRate: 0.00},
  {id: 9, name: 'Florida', statesTaxRate: 6.00, localTaxRate: 1.01},
  {id: 10, name: 'Georgia', statesTaxRate: 4.00, localTaxRate: 3.37},
  {id: 11, name: 'Hawaii', statesTaxRate: 4.00, localTaxRate: 0.44},
  {id: 12, name: 'Illinois', statesTaxRate: 6.25, localTaxRate: 2.48},
  {id: 13, name: 'Indiana', statesTaxRate: 7.00, localTaxRate: 0.00},
  {id: 14, name: 'Iowa', statesTaxRate: 6.00, localTaxRate: 0.94},
  {id: 15, name: 'Kansas', statesTaxRate: 6.50, localTaxRate: 2.21},
  {id: 16, name: 'Kentucky', statesTaxRate: 6.00, localTaxRate: 0.00},
  {id: 17, name: 'Louisiana', statesTaxRate: 4.45, localTaxRate: 5.10},
  {id: 18, name: 'Maine', statesTaxRate: 5.50, localTaxRate: 0.00},
  {id: 19, name: 'Maryland', statesTaxRate: 6.00, localTaxRate: 0.00},
  {id: 20, name: 'Massachusetts', statesTaxRate: 6.25, localTaxRate: 0.00},
  {id: 21, name: 'Michigan', statesTaxRate: 6.00, localTaxRate: 0.00},
  {id: 22, name: 'Minnesota', statesTaxRate: 6.88, localTaxRate: 0.61},
  {id: 23, name: 'Mississippi', statesTaxRate: 7.00, localTaxRate: 0.07},
  {id: 24, name: 'Missouri', statesTaxRate: 4.23, localTaxRate: 4.07},
  {id: 25, name: 'Nebraska', statesTaxRate: 5.50, localTaxRate: 1.44},
  {id: 26, name: 'Nevada', statesTaxRate: 6.85, localTaxRate: 1.38},
  {id: 27, name: 'New Jersey', statesTaxRate: 6.63, localTaxRate: -0.03},
  {id: 28, name: 'New Mexico', statesTaxRate: 5.00, localTaxRate: 2.72},
  {id: 29, name: 'New York', statesTaxRate: 4.00, localTaxRate: 4.52},
  {id: 30, name: 'North Carolina', statesTaxRate: 4.75, localTaxRate: 2.23},
  {id: 31, name: 'North Dakota', statesTaxRate: 5.00, localTaxRate: 1.96},
  {id: 32, name: 'Ohio', statesTaxRate: 5.75, localTaxRate: 1.49},
  {id: 33, name: 'Oklahoma', statesTaxRate: 4.50, localTaxRate: 4.49},
  {id: 34, name: 'Pennsylvania', statesTaxRate: 6.00, localTaxRate: 0.34},
  {id: 35, name: 'Rhode Island', statesTaxRate: 7.00, localTaxRate: 0.00},
  {id: 36, name: 'South Carolina', statesTaxRate: 6.00, localTaxRate: 1.44},
  {id: 37, name: 'South Dakota', statesTaxRate: 4.50, localTaxRate: 1.90},
  {id: 38, name: 'Tennessee', statesTaxRate: 7.00, localTaxRate: 2.55},
  {id: 39, name: 'Texas', statesTaxRate: 6.25, localTaxRate: 1.25},
  {id: 40, name: 'Utah', statesTaxRate: 6.10, localTaxRate: 1.09},
  {id: 41, name: 'Vermont', statesTaxRate: 6.00, localTaxRate: 0.24},
  {id: 42, name: 'Virginia', statesTaxRate: 5.30, localTaxRate: 0.45},
  {id: 43, name: 'Washington', statesTaxRate: 6.50, localTaxRate: 2.79},
  {id: 44, name: 'West Virginia', statesTaxRate: 6.00, localTaxRate: 0.55},
  {id: 45, name: 'Wisconsin', statesTaxRate: 5.00, localTaxRate: 0.43},
  {id: 46, name: 'Wyoming', statesTaxRate: 4.00, localTaxRate: 1.36},
];

/**
 * Data source for the TaxesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TaxesTableDataSource extends DataSource<TaxesTableItem> {
  data: TaxesTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }
  
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TaxesTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TaxesTableItem[]): TaxesTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TaxesTableItem[]): TaxesTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'statesTaxRate': return compare(+a.statesTaxRate, +b.statesTaxRate, isAsc);
        case 'localTaxRate': return compare(+a.localTaxRate, +b.localTaxRate, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

