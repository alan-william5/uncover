import { createConneciton } from "./utils";

export async function verifyEmailAddress(emailAddress: string) {
  try {
    const res = await fetch(
      `https://api.emailable.com/v1/verify?email=${emailAddress}&api_key=${process.env.API_KEY}`
    );

    // specific to emailable
    if (res.status === 249) {
      console.error(
        "response took too long: ",
        res.type,
        res.status,
        res.statusText,
        await res.json()
      );
      return { message: "Service taking too long", status: 204 };
    }

    if (!res.ok) {
      console.error(
        "email not verified: ",
        res.type,
        res.status,
        res.statusText,
        await res.json()
      );
      return { message: null, status: 500 };
    }

    const {
      disposable,
      domain,
      first_name,
      last_name,
      mailbox_full,
      no_reply,
      score,
      state,
    } = await res.json();

    if (state !== "deliverable" || disposable || mailbox_full || no_reply) {
      console.error(
        "bad email address: ",
        `state: ${state}`,
        `disposable: ${disposable}`,
        `mailbox full: ${mailbox_full}`,
        `no reply address: ${no_reply}`
      );
      return { message: "bad email address", status: 403 };
    }

    return { message: "email added", status: 200 };
  } catch (err) {
    console.error(err);
    return { message: null, status: 500 };
  }
}

export async function addEmailAddressToDatabase(emailAddress: string) {
  const connection = createConneciton();
  connection.query(
    `INSERT INTO wishlist (email) VALUES (${emailAddress})`,
    (error) => {
      if (error) {
        console.error(error);
        throw error;
      }
    }
  );
  connection.end();
}
