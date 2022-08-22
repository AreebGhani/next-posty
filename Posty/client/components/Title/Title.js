// Imports
import Head from "next/head"; // Next Head

// Title Components
export default function Title(props) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title> {/* Changing Title */}
      </Head>
    </>
  );
}
