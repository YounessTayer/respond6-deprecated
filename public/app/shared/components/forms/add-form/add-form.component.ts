import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt/angular2-jwt';
import {FormService} from '/app/shared/services/form.service';

@Component({
    selector: 'respond-add-form',
    templateUrl: './app/shared/components/forms/add-form/add-form.component.html',
    providers: [FormService]
})

@CanActivate(() => tokenNotExpired())

export class AddFormComponent {

  routes;
  errorMessage;

  // model to store
  model: {
    name: '',
    cssClass: ''
  };

  _visible: boolean = false;

  @Input()
  set visible(visible: boolean){

    // set visible
    this._visible = visible;

    // reset model
    this.model = {
      name: '',
      cssClass: ''
    };

  }

  get visible() { return this._visible; }

  @Output() onCancel = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();

  constructor (private _formService: FormService) {}

  /**
   * Init
   */
  ngOnInit() {

  }

  /**
   * Hides the add modal
   */
  hide() {
    this._visible = false;
    this.onCancel.emit(null);
  }

  /**
   * Submits the form
   */
  submit() {

    this._formService.add(this.model.name, this.model.cssClass)
                     .subscribe(
                       data => { this.success(); },
                       error => { this.errorMessage = <any>error; this.error(); }
                      );

  }

  /**
   * Handles a successful add
   */
  success() {

    toast.show('success');

    this._visible = false;
    this.onAdd.emit(null);

  }

  /**
   * Handles an error
   */
  error() {

    console.log('[respond.error] ' + this.errorMessage);
    toast.show('failure');

  }


}