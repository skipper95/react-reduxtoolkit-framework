import React from "react";
import { Language } from "../../constants";
import en from "./json/en.json";
import ja from "./json/ja.json";
import { Config } from "../../config";

interface I18Props {
	tkey: string;
}

interface JSONData {
	[name: string]: string;
}

export const DefaultLanguage = Config.defaultLanguage;

export function i18Get(key: string, lang: string) {
	const translations: JSONData = lang === Language.JAPANESE ? ja : en;
	return translations[key] ? translations[key] : key;
}

const I18 = ({ tkey }: I18Props) => {
	const value = i18Get(tkey, DefaultLanguage);
	return <>{value}</>;
};

export default I18;
