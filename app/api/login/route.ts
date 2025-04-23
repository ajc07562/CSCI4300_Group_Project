// app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongoDB from '../../../config/mongodb';
import User, { IUser } from '../../../models/User';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await connectMongoDB();

    const user: IUser | null = await User.findOne({ email }).exec();
    if (!user) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // ✅ You can also set a cookie or JWT here if needed
    return NextResponse.json({ message: 'Login successful', username: user.username }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}


