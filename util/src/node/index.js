import { curry } from '../function'

export * from './console'
export * from './packages'
export * from './shell'

import * as fs from './fs'

export const exists = fs.exists
export const isDirectory = fs.isDirectory
export const isFile = fs.isFile
export const isLink = fs.isLink
export const readFile = fs.readFile
export const writeFile = curry(fs.writeFile, 2)
export const symlink = curry(fs.symlink, 2)
export const findConfig = fs.findConfig
export const getAllInDirectory = fs.getAllInDirectory
