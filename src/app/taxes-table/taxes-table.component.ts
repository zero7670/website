import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TaxesTableDataSource, TaxesTableItem } from './taxes-table-datasource';
import { NavbarService } from '../navbar/navbar.service';


@Component({
  selector: 'app-taxes-table',
  templateUrl: './taxes-table.component.html',
  styleUrls: ['./taxes-table.component.css']
})
export class TaxesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TaxesTableItem>;
  dataSource: TaxesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'statesTaxRate', 'localTaxRate'];

  constructor(public nav: NavbarService) {
    this.dataSource = new TaxesTableDataSource();
  }
  ngOnInit() {
    this.nav.show();
    
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
}
