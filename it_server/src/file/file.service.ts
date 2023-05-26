import * as fs from 'fs'
import { v4 } from 'uuid'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FileService {
	constructor() {}

	async saveProfileImg(img: any): Promise<string> {
		try {
			
			if (!fs.existsSync('public/posts')) {
				fs.mkdir('public/posts', err => {
					if (err) {
						console.log(err, 'Error create dir')
					}
				})
			}
			const fileName = v4() + '.jpg'
			await fs.writeFile('public/posts/' + fileName, img.buffer, err => {
				if (err) {
					console.log(err, 'Error save img')
				}
			})

			return fileName
		} catch (e) {
			console.log(e)
		}
	}

	async delete(fileName: string) {
		try {
			await fs.unlink('public/posts/' + fileName, err => {
				if (err) {
					console.log(err, 'Error remove img')
				}
			})
		} catch (e) {
			console.log(e)
		}
	}
}
