import { User } from './../app/model/user'

export class UserMigration {
    public static async migrate() {

        const users = [
            {
                name: 'User 1',
            },
            {
                name: 'User 2',
            },
            {
                name: 'User 3',
            },
        ]

        for (const user of users) {
            let u = await User.findOne({
                name: user.name,
            })
            if (!u) {
                u = new User(user)
                await u.save()
            }
        }
    }
}
