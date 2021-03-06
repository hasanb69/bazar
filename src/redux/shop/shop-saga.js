import { takeEvery,takeLatest,put,call } from "@redux-saga/core/effects";
import {convertCollectionsSnapshotToMap,firestore} from '../../firebase/firebase'
import SHOPTYPE from './shop-type'
import {fetchSuccess,fetchFailur} from './shop-actions'


export function* fetchAsync (){
    try{
        const collectionRef=firestore.collection('collections')/*==>read collections data from database */
        const snapshot=yield collectionRef.get()
        const collectionsMap=yield call(convertCollectionsSnapshotToMap,snapshot)
        yield put(fetchSuccess(collectionsMap))
     }
     catch (error){
         yield put(fetchFailur(error.message))
     }
}


export function* fetchsStart(){
    yield takeLatest(
        SHOPTYPE.FETCH_COLLECTION_START,
        fetchAsync
    )
}