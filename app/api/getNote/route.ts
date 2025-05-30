import GetAllDocuments from "@/actions/GetAllDocuments";

export async function POST(req: Request){

    try {
        const { id } = await req.json();

        const document = await GetAllDocuments(id);

        if(!document){
            return new Response(JSON.stringify("Error! Document for this user not founds!"), {
                status: 404
            })
        }

        return new Response(JSON.stringify(document), {
            status: 200
        });

    } catch {
        return new Response(JSON.stringify("Error request"), {
            status: 404
        });
    }

}