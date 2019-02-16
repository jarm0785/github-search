import { Component, OnInit } from '@angular/core';
import { UnifiedSearchService } from '../unified-search.service';
import { GitSearch } from '../git-search';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdvancedSearchModel } from '../advanced-search-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  favorites: Array<number> = [];
  page: string;
  next: number;
  prev: number;
  last: number;
  first: number = 1;
  form: FormGroup;
  formControls = {};

  constructor(private UnifiedSearchService: UnifiedSearchService,
              private route: ActivatedRoute,
              private router: Router ) { 
                this.modelKeys.forEach( (key) => {
                  let validators = [];
                  if (key === 'q') {
                    validators.push(Validators.required);
                  }
                  if (key === 'stars') {
                    validators.push(Validators.maxLength(4))
                  }
                  validators.push(this.noCharacters);
                  this.formControls[key] = new FormControl(this.model[key], validators);
                })
                this.form = new FormGroup(this.formControls);
              }
  
  model = new AdvancedSearchModel('', '', '', null, null, '');            
  modelKeys = Object.keys(this.model);
  
  noCharacters(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
      validateEmail: {
        valid: false
      }
    } : null;
  }

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
    this.UnifiedSearchService.unifiedSearch(this.searchQuery).subscribe((response) => {
      console.log(response);
      this.searchResults = response;
    }, (error) => {
      alert("Error: " + error.statusText)
    })          
  }

  checkType = (key) => {
    return typeof key === 'string' ? 'text' : typeof key;
  }

  handleFavorite = (id) => {
    return this.favorites.push(id);
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
    let search : string = this.form.value['q'];
    let params : string = "";
    this.modelKeys.forEach( (elem) => {
      if (elem === 'q') {
        return false;
      }
      if (this.form.value[elem]) {
        params += '+' + elem + ':' + this.form.value[elem];
      }
    })
    this.searchQuery = search;
    if (params !== '') {
      this.searchQuery = search + params;
    }
    this.displayQuery = this.searchQuery;
    this.gitSearch();
    this.router.navigate(['/search/' + search + '/' + this.page]);
  }
}