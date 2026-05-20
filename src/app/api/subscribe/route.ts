import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email format")
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        error: { 
          message: "Validation failed", 
          details: parsed.error.flatten().fieldErrors 
        } 
      }, { status: 422 });
    }

    const dataPath = path.join(process.cwd(), "src/data/subscribers.json");
    const data = await fs.readFile(dataPath, "utf8");
    const subscribers = JSON.parse(data);

    if (subscribers.includes(parsed.data.email)) {
      return NextResponse.json({ error: { message: "Email already subscribed" } }, { status: 409 });
    }

    subscribers.push(parsed.data.email);
    await fs.writeFile(dataPath, JSON.stringify(subscribers, null, 2));

    return NextResponse.json({ data: { message: "Successfully subscribed" } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { message: "Internal server error" } }, { status: 500 });
  }
}
