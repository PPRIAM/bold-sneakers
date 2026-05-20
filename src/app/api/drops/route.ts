import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), "src/data/drops.json");
    const data = await fs.readFile(dataPath, "utf8");
    return NextResponse.json({ data: JSON.parse(data) });
  } catch (error) {
    return NextResponse.json({ error: { message: "Failed to fetch drops" } }, { status: 500 });
  }
}
