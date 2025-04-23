//import { WebhookHandler } from "@liveblocks/node";

// // Add your signing key from a project's webhooks dashboard
// const WEBHOOK_SECRET = "YOUR_SIGNING_SECRET";
// const webhookHandler = new WebhookHandler(WEBHOOK_SECRET);

// // Add your secret key from a project's API keys dashboard
// const API_SECRET = "sk_dev_vfy2JEEY_ZrdQsxWANysu2UlPdIgH4rEFNPkHplGFr4mfTUKtAt2QV5oA3X93EHq";

//request: Request
export async function POST() {
  // const body = await request.json();
  // const headers = request.headers;

  // // Verify if this is a real webhook request
  // let event;
  // try {
  //   event = webhookHandler.verifyRequest({
  //     headers: headers,
  //     rawBody: JSON.stringify(body),
  //   });
  // } catch (err) {
  //   console.error(err);
  //   return new Response("Could not verify webhook call", { status: 400 });
  // }

  // // When Storage document data has been updated
  // if (event.type === "storageUpdated") {
  //   const { roomId } = event.data;

  //   // Get Storage data from Liveblocks REST API
  //   const url = `https://api.liveblocks.io/v2/rooms/${roomId}/storage`;
  //   const response = await fetch(url, {
  //     headers: { Authorization: `Bearer ${API_SECRET}` },
  //   });

  //   if (!response.ok) {
  //     return new Response("Problem accessing Liveblocks REST APIs", {
  //       status: 500,
  //     });
  //   }

  //   // Your JSON Storage document data as a string
  //   const storageData = await response.text();

  //   console.log("storageData: ", storageData);

  //   // TODO: Update database
  // }

  // return new Response(null, { status: 200 });
}