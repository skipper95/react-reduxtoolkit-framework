export enum Language {
	ENGLISH = "en",
	JAPANESE = "ja",
}

export enum APIStatus {
	FULFILLED = "FULFILLED",
	REJECTED = "REJECTED",
}

export const priceRegex = /^[0-9]+$/;

export const quantityRegex = /^[0-9]+((,|\.)?[0-9])*\s?(g|kg|Kg|KG|ml|L|個|キログラム|グラム)?$/;

export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const phoneNumberRegex = /^\d{2}(?:-\d{4}-\d{4}|\d{8}|\d-\d{3,4}-\d{4})$/;

export const numberRegex = /^[0-9]+$/;

export enum LocalStorageKeys {
	TOKEN = "TOKEN",
}

export enum Roles {
	ADMIN = "ADMIN",
	USER = "USER",
}

