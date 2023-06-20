# node-front-backend

# Back-end
---

**Iniciar el proyecto**
`npm init -y`

## Dependencias
**Instalar TypeScript**
`npm install typescript -D`

**Instalar libreria de los endpoints**
`npm install express -E`

**Instalar @types/express**
`npm install @types/express`

**Libreria cors**
`npm install cors`
`npm install @types/cors`

**Permite que ver los cambios en tiempo real**
`npm install ts-node-dev -D`

## Configuraciones
Agregamos en el archivo package.json, sección script
`"tsc": "tsc"`

**Iniciar el archivo .ts**
`npm run tsc -- --init`
En el archivo tsconfig.json podemos descomentar las siguientes configuraciones 
`"outDir": "./build", 
"noUnusedLocals": true, 
"noUnusedParameters": true,   
"noImplicitReturns": true,      
"noFallthroughCasesInSwitch": true,`

## Pasar de TS a JS
Agregamos las siguientes lineas al archivo package.json en la sección scripts
`"dev": "ts-node-dev src/index.ts"`
`"start": "node build/index.js"`

Corremos el proyecto con 
`npm run tsc -- --init`
`npm run tsc`

## Levantar el servidor
`npm run dev`








