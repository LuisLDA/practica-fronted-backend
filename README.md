# node-front-backend

# Back-end

**Iniciar el proyecto**
```sh
npm init -y
```

## Dependencias
**Instalar TypeScript**
```sh
npm install typescript -D
```

**Instalar libreria de los endpoints**
```sh
npm install express -E
```

**Instalar @types/express**
```sh
npm install @types/express
```

**Libreria cors**
```sh
npm install cors
npm install @types/cors
```

**Permite que ver los cambios en tiempo real**
```sh
npm install ts-node-dev -D
```

## Configuraciones
Agregamos en el archivo package.json, sección script
```json
"tsc": "tsc"
```

**Iniciar el archivo .ts**
```sh
npm run tsc -- --init
```
En el archivo tsconfig.json podemos descomentar las siguientes configuraciones 
```json
"outDir": "./build", 
"noUnusedLocals": true, 
"noUnusedParameters": true,   
"noImplicitReturns": true,      
"noFallthroughCasesInSwitch": true
```

## Pasar de TS a JS
Agregamos las siguientes lineas al archivo package.json en la sección scripts
```json
"dev": "ts-node-dev src/index.ts"
"start": "node build/index.js"
```

Corremos el proyecto con 
```sh
npm run tsc -- --init
npm run tsc
```

## Levantar el servidor
```sh
npm run dev
```

# Front-end

Instalar expo de forma global para ejecutar la aplicación móvil 
```sh
npm install -g expo-cli
```

Iniciar un proyecto con expo
```sh
expo init [nombre app]
```

Para correr el proyecto, nos dirigimos al directorio y corremos algunos de los comandos
```sh 
- cd app-ejemplo
- yarn start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- yarn android
- yarn ios # requires an iOS device or macOS for access to an iOS simulator
- yarn web
```

Debemos instalar las siguientes librerías para ver en la web
```sh 
npx expo install react-native-web@~0.18.10 react-dom@18.2.0 @expo/webpack-config@^18.0.1
```

## Librerias React Native
```sh
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm i react-native-vector-icons
```
