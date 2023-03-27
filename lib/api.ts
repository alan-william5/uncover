import { createConneciton } from "./utils";
import sum from "hash-sum";

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
      return { message: "Service taking too long", status: 249 };
    }

    if (!res.ok) {
      console.error(
        "email not verified: ",
        res.type,
        res.status,
        res.statusText,
        await res.json()
      );
      return { message: null, status: 404 };
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
      return { message: "bad email address", status: 404 };
    }

    return { message: "email added", status: 200 };
  } catch (err) {
    console.error(err);
    return { message: null, status: 500 };
  }
}

export async function addEmailAddressToDatabase(emailAddress: string) {
  const connection = createConneciton();
  return await connection.execute(
    `INSERT INTO wishlist (email) VALUES ("${emailAddress}")`
  );
}

export async function hasEmailAddressBeenChecked(emailAddress: string) {
  try {
    const res = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/${sum(emailAddress)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`${res.status}: `, res.statusText);
    }
    const data = await res.json();
    return data.result === "1";
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function addToRedis(emailAddress: string) {
  try {
    const res = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/set/${sum(emailAddress)}/1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`${res.status}: `, res.statusText);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
