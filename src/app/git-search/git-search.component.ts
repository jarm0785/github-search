import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})

export class GitSearchComponent implements OnInit {
  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  page: string;
  next: number;
  prev: number;
  last: number;
  first: number = 1;

  constructor(private GitSearchService: GitSearchService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.page = params.get('page');
      this.next = +this.page + 1;
      this.prev = +this.page - 1;
      this.gitSearch();
    } )

    this.route.data.subscribe( (result) => {
      this.title =  result.title
    } );
  }

  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery, this.page).then( (response)=> {
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })    
  }

  nextPage = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery + '/' + this.next ]);
  }

  prevPage = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery + '/' + this.prev ]);
  }

  lastPage = () => {
    this.last = Math.ceil(1000 / 30);
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery + '/' + this.last ]);
  }

  firstPage = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery + '/1' ]);
  }

  sendQuery = () => {
    this.searchResults = null;
    this.router.navigate(['/search/' + this.searchQuery + '/' + this.page ]);
  }
}