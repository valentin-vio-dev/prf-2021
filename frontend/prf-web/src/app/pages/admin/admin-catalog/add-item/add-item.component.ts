import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PanelService } from 'src/app/services/panel/panel.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  form: FormGroup | any;
  selectedImage: string | any;
  editing: boolean = false;
  productId: any;

  constructor(
    private toastService: ToastService,
    private productService: ProductService,
    private panelService: PanelService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      manufacturer: new FormControl('', Validators.required),
      interface: new FormControl(''),
      chipset: new FormControl('', Validators.required),
      memory_size: new FormControl(''),
      price: new FormControl(''),
      avaible: new FormControl(false),
      image: new FormControl(''),
      description: new FormControl(''),
    });

    if (this.panelService.data) {
      this.form.patchValue(this.panelService.data);
      this.selectedImage = this.panelService.data.image;
      this.editing = true;
      this.productId = this.panelService.data._id;
    }
  }

  submit() {
    if (this.form.invalid) {
      this.toastService.create('Please fill all required fields!', 2000);
      return;
    }
    this.form.get('image').setValue(this.selectedImage || '');

    if (this.editing) {
      this.productService.editProduct(this.productId, this.form.value).subscribe((res: any) => {
        this.toastService.create(res.message, 2000);
        this.panelService.closeCurrentPanel('EDITED');
      }, (err: any) => {
        this.toastService.create(err.error.message, 2000);
      });
    } else {
      this.productService.addProduct(this.form.value).subscribe((res: any) => {
        this.toastService.create(res.message, 2000);
        this.panelService.closeCurrentPanel('ADDED');
      }, (err: any) => {
        this.toastService.create(err.error.message, 2000);
      });
    }
  }

  selectImage() {
    let input: any = document.getElementById('input-file');

    input.onchange = (event: any) => {
      let inPic: any = event.target;
      let reader = new FileReader();
      reader.onload = () => {
        let imageUrl = reader.result;
        this.selectedImage = imageUrl;
      };

      if (inPic.files && inPic.files.length > 0) {
        reader.readAsDataURL(inPic.files[0]);
      }
    }

    input.click();
  }

  deleteProduct() {
    this.productService.delete(this.productId).subscribe((res: any) => {
      this.toastService.create(res.message, 2000);
      this.panelService.closeCurrentPanel('DELETED');
    }, (err: any) => {
      this.toastService.create(err.error.message, 2000);
    });
  }

}
