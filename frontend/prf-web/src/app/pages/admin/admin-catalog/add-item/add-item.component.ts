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
  loading = false;
  withSpring: boolean = false;

  constructor(
    private toastService: ToastService,
    private productService: ProductService,
    private panelService: PanelService
    ) { }

  ngOnInit(): void {
    
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      manufacturer: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      available: new FormControl(false),
      alcohol: new FormControl(false),
      image: new FormControl(''),
      description: new FormControl(''),
    });

    if (this.panelService.data) {
      this.form.patchValue(this.panelService.data);
      this.selectedImage = this.panelService.data.image;
      this.editing = true;
      if (this.panelService.data._id) {
        this.productId = this.panelService.data._id;
      } else {
        this.productId = this.panelService.data.id;
      }
    }

    if (this.panelService.opts) {
      if (this.panelService.opts.withSpring) {
        this.withSpring = true;
      }
    }
  }

  submit() {
    if (this.form.invalid) {
      this.toastService.create('Please fill all required fields!', 2000);
      return;
    }
    this.form.get('image').setValue(this.selectedImage || '');
    this.loading = true;

    if (this.editing) {
      if (this.withSpring) {
        this.productService.editProductSpring(this.productId, this.form.value).subscribe((res: any) => {
          this.toastService.create('Product updated!', 2000);
          this.loading = false;
          this.panelService.closeCurrentPanel('EDITED');
        }, (err: any) => {
          this.loading = false;
          this.toastService.create('Something went wrong :(', 2000);
        });
      } else {
        this.productService.editProduct(this.productId, this.form.value).subscribe((res: any) => {
          this.toastService.create(res.message, 2000);
          this.loading = false;
          this.panelService.closeCurrentPanel('EDITED');
        }, (err: any) => {
          this.loading = false;
          this.toastService.create(err.error.message, 2000);
        });
      }
    } else {
      if (this.withSpring) {
        this.productService.addProductSpring(this.form.value).subscribe((res: any) => {
          this.toastService.create('Product added!', 2000);
          this.loading = false;
          this.panelService.closeCurrentPanel('ADDED');
        }, (err: any) => {
          this.toastService.create('Something went wrong :(', 2000);
          this.loading = false;
        });
      } else {
        this.productService.addProduct(this.form.value).subscribe((res: any) => {
          this.toastService.create(res.message, 2000);
          this.loading = false;
          this.panelService.closeCurrentPanel('ADDED');
        }, (err: any) => {
          this.toastService.create(err.error.message, 2000);
          this.loading = false;
        });
      }
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

  compressImage(src: any, percent: number) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = elem.width * percent;
        elem.height = elem.height * percent;
        const ctx = elem.getContext('2d') as any;
        ctx.drawImage(img, 0, 0, elem.width * percent, elem.height * percent);
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    });
  }

  deleteProduct() {
    this.loading = true;
    if (this.withSpring) {
      this.productService.deleteSpring(this.productId).subscribe((res: any) => {
        this.toastService.create('Product deleted!', 2000);
        this.loading = false;
        this.panelService.closeCurrentPanel('DELETED');
      }, (err: any) => {
        this.toastService.create(err.error.message, 2000);
        this.loading = false;
      });
    } else {
      this.productService.delete(this.productId).subscribe((res: any) => {
        this.toastService.create(res.message, 2000);
        this.loading = false;
        this.panelService.closeCurrentPanel('DELETED');
      }, (err: any) => {
        this.toastService.create(err.error.message, 2000);
        this.loading = false;
      });
    }
  }

}
