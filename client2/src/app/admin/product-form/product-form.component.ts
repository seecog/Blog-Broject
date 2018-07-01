import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ProductService } from '../../providers/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  private btn_stt: boolean = true;
  private edit_id: string;
  private productFrm: FormGroup;
  private categories: any[] = [];
  private urli = 'http://localhost:3003/api/uploadpic';
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3003/api/uploadpic', itemAlias: 'photo' });
  private uploadInfo: string = '';
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: Http, private productService: ProductService) { }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item);
      console.log("response ", JSON.stringify(response))
      // console.log('status ', status.split('\\'))
      this.uploadInfo = response;


    };
    // this.activatedRoute.params.subscribe(x => {
    //   this.productService.getProduct(x['id']).subscribe(
    //     (res) => {
    //       if(x['id']!='new'){
    //       this.edit_id = x['id'];
    //       this.btn_stt = false;
    //       this.productFrm.patchValue(res.json())
    //       }
    //     },
    //     (err) => {
    //       console.log('The error is ', err)
    //     }
    //   )
    // })



    this.getCategories();
    this.productFrm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      cost: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    })
  }


  save(item) {
    let result = item.upload();
    
  }
  updateProduct() {
    this.productService.updateProduct(this.edit_id, this.productFrm.value).subscribe(
      (res) => {
        console.log('record Updated');
        this.router.navigate(['/admin/products'])
      },
      (err) => {
        console.log('The error is ', err)
      }
    )
  }

  saveProduct() {
    console.log('Upload status ',this.uploadInfo.split("\\")[1]);
    let obj = this.productFrm.value;
    obj.url = this.uploadInfo.split("\\")[1];
    console.log('The object isn ',obj)
    this.productService.createProduct(this.productFrm.value).subscribe(
      (res) => {
        console.log('record saved');
        this.router.navigate(['/admin/products'])
      },
      (err) => {
        console.log('The error is ', err)
      }
    )
  }

  getCategories() {
    this.http.get("http://localhost:3003/api/categories").subscribe(
      (res) => {
        console.log('The response is ', res.json());
        this.categories = res.json();
      },
      (err) => {
        console.log(err)
      })

  }

}
