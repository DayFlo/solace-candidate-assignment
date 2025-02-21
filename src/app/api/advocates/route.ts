import { NextRequest } from "next/server";

import db from "@db/index";
import { advocates } from "@db/schema";
import { advocateData } from "@db/seed/advocates";


export async function GET(req: NextRequest) {
  // Biiig boi try catch
  const params =  req.nextUrl.searchParams;
  
  try {
    if (params.size > 0) {
      const page = params.get('page')

      const limit = 10;
      const offset = Number.parseInt(`${page}`) * limit;

      // Mmmm, maybe future we add some ordering
      const data = await db.select().from(advocates)
        .limit(limit)
        .offset(offset);

      return Response.json({ data });
      } else {
      const data = await db.select().from(advocates)

      return Response.json({ data });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
