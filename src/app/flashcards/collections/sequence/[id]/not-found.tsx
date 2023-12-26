import ErrorPage from "@components/ErrorPage";

export default function NotFound() {
  const subtitle = "You made Bobo sad.";

  return <ErrorPage title="404" errorText="He couldn't find the card." />;
}
