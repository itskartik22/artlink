import db from "@/lib/db"

export const getUserByID = async (id: string) => {
    const user = await db.user.findFirst({
        where: {
            id
        }
    })

    if(!user) {
        return null;
    }

    return user;
}


export const getUserByEmail = async (email: string) => {
    const user = await db.user.findFirst({
        where: {
            email
        }
    })

    if(!user) {
        return null;
    }

    return user;
}