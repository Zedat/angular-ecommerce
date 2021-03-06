import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product)
  }

  getAll() {
    return this.db.list('/products')
                  .snapshotChanges()
                  .pipe(map (results => results.map(
                    res => ({ key: res.payload.key, ...res.payload.val()})
                  )))
  }

  getOne(productId) {
    return this.db.object(`/products/${productId}`)
  }

  updateOne(productId, product) {
    return this.db.object(`/products/${productId}`).update(product)
  }

  deleteOne(productId) {
    return this.db.object(`/products/${productId}`).remove()
  }
}
