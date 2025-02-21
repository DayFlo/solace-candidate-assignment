import { NextRequest } from "next/server";
import { sql, or, like, arrayContains } from "drizzle-orm";

import db from "@db/index";
import { advocates } from "@db/schema";
import { advocateData } from "@db/seed/advocates";


export async function GET(req: NextRequest) {
  // Biiig boi try catch
  const params =  req.nextUrl.searchParams;
  
  try {
    if (params.size > 0) {
      const page = params.get('page')
      const search = params.get('search')

      const limit = 10;
      const offset = Number.parseInt(`${page}`) * limit;

      // Mmmm, maybe future we add some ordering
      const query = db.select().from(advocates)

      if (search) {
        query.where(or(
          like(advocates.firstName, `%${search}%`),
          like(advocates.lastName, `%${search}%`),
          like(advocates.city, `%${search}%`),
          like(advocates.degree, `%${search}%`),
          sql`${advocates.phoneNumber}::TEXT ILIKE ${`%${search}%`}`,
          arrayContains(advocates.specialties, [search]),
        ));
      }

      query
        .limit(limit)
        .offset(offset);

      const data = await query;

      return Response.json({ data });
      } else {
      const data = await db.select().from(advocates)

      return Response.json({ data });
    }
  } catch (error) {
    console.error(error);
    return Response.error();
  }
}
