import ErrorPage from "@components/lib/ErrorPage";
import { Locale, getDictionary } from "@dictionaries/helpers/getDictionaries";
import { defaultLocale } from "@dictionaries/helpers/locales";
import { getUserLanguage } from "../../../../../internationalizationMiddleware";

export default async function NotFound() {
  const userLanguage = (getUserLanguage() ?? defaultLocale) as Locale;
  const dictionary = await getDictionary(userLanguage);

  return (
    <ErrorPage
      title="404"
      subtitle={dictionary.Errors.pages.notFound.boboSad}
      errorText={dictionary.Errors.pages.notFound.selectTagFirst}
    />
  );
}
