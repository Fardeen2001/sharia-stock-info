import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Check if the user is authenticated and authorized
    const session = await getServerSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log(users);
    // Return the users
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    // Check if the user is authenticated and authorized
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate the input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Note: In a real application, you should hash the password before storing it
        role: role || "USER",
      },
    });

    // Return the created user
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    // Check if the user is authenticated and authorized
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { id, name, email, role } = body;

    // Validate the input
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Update the user
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, role },
    });

    // Return the updated user
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: Request) {
  try {
    // Check if the user is authenticated and authorized
    const session = await getServerSession();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { id } = body;

    // Validate the input
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Delete the user
    await prisma.user.delete({
      where: { id },
    });

    // Return success message
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
