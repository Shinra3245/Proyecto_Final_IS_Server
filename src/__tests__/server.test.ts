import { connectDB } from '../server'
import db from '../config/db'



// creacion de un mock para la base de datos
jest.mock('../config/db')

describe('connectDB function', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db,'authenticate')
            .mockRejectedValue(new Error('Hubo un errorcillo al conectar la BD'))
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un errorcillo al conectar la BD')
        )
    })
})


