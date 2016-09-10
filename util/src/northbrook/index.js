import { curry } from '../function'

import * as config from './config'

export const resolvePackage = config.resolvePackage
export const resolveExtends = curry(config.resolveExtends, 2)
export const modifyConfig = curry(config.modifyConfig, 3)
export const addPlugin = config.addPlugin
export const addPackage = config.addPackage

import * as plugins from './plugins'

export const isPlugin = plugins.isPlugin
export const filterDefaultPlugins = curry(plugins.filterDefaultPlugins, 2)
export const resolvePlugins = curry(plugins.resolvePlugins, 2)

import * as packages from './packages'

export const onlyPackage = curry(packages.onlyPackage, 2)
export const resolvePackages = curry(packages.resolvePackages, 2)
