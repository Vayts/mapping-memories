export interface IEditPhoto {
	state: IEditPhotoState,
	setState: { (any: any) : void },
}

export interface IEditPhotoState {
	isOpen: boolean,
	width: number,
	height: number,
	photo: File | null,
  photoBlob: string | null,
	photoName?: string,
	saveFunc: { (any: any) : void },
	border?: number,
}

export interface IEditPhotoStyle {
	width: number,
	border?: number,
}
