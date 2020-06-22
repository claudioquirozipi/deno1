import { Response, Request } from "https://deno.land/x/oak/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

interface ctxDTO {
  response: Response;
  request: Request;
  params: {
    id: string;
  };
}
interface users extends Array<user> {}
interface user {
  id: string;
  name: string;
}

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("test");
const userss = db.collection("users");

let users: users = [
  { id: "1", name: "claudio" },
];

export const getUser = async ({ response, params }: ctxDTO) => {
  try {
    const user = await userss.findOne({ _id: { $oid: params.id } });
    response.body = {
      message: "todo bien",
      user,
    };
  } catch (error) {
    response.body = {
      message: "user not found",
    };
  }
};
export const getUsers = async ({ response }: ctxDTO) => {
  try {
    const all_users = await userss.find({ name: { $ne: null } });
    response.body = {
      message: "Busqueda exitosa ",
      users: all_users,
    };
  } catch (error) {
    response.status = 404;
    response.body = {
      message: `ocurrió un error${error}`,
    };
  }
};
export const createUser = async ({ request, response }: ctxDTO) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "body is required",
    };
  } else {
    const insertId = await userss.insertOne({
      name: body.value.name,
    });
    response.status = 200;
    response.body = {
      message: "user create",
      users: insertId,
    };
  }
};
export const updateUser = async ({ request, response, params }: ctxDTO) => {
  try {
    const body = await request.body();
    const updatedUser = body.value;
    const { matchedCount, modifiedCount, upsertedId } = await userss.updateOne(
      { _id: { $oid: params.id } },
      { $set: { ...updatedUser } },
    );
    response.status = 200;
    response.body = {
      message: "user edited",
    };
  } catch (error) {
    response.status = 404;
    response.body = {
      message: "usuarion no encontrado",
    };
  }
};

export const deleteUser = async ({ response, params }: ctxDTO) => {
  try {
    const deleteCount = await userss.deleteOne({ _id: { $oid: params.id } });
    response.status = 200;
    response.body = {
      message: "borrado con exito ",
    };
  } catch (error) {
    response.status = 404;
    response.body = {
      message: "ocurrió un error, no se pudo borrar",
    };
  }
};
