
# 🖨️ Contadores OfficePrinter

Una aplicación web local para consultar el número de serie e impresiones equivalentes (A4/carta) de impresoras HP a través de web scraping.

Impresoras compatibles: 4015, 4250, M601, M602, M603 .. M605 

---

## 📦 Requisitos

- Node.js (v14 o superior recomendado)
- npm (gestor de paquetes de Node.js)
- `curl` instalado y disponible en el sistema (para conexiones a la impresora)

---

## 🚀 Instalación

1. Cloná o copiá este repositorio en tu máquina local.
2. Abrí una terminal en la carpeta del proyecto.
3. Instalá las dependencias necesarias:

```bash
npm install
```

---

## 🖥️ Uso local

1. Ejecutá el servidor con:

```bash
node core.js
```

2. Abrí tu navegador y accedé a:

```
http://localhost:3000
```

3. Ingresá la IP de una impresora HP y presioná “Consultar”.

---

## 🌐 Estructura del proyecto

```
📁 proyecto/
│
├── core.js              # Backend Express con web scraping
├── package.json         # Dependencias y configuración npm
├── public/
│   └── index.html       # Interfaz web
│
├── static/
│   ├── styles.css       # Estilos personalizados
│   └── favicon.ico      # Ícono de pestaña
```

---

## 🧰 Despliegue en IIS (opcional)

1. Instalá **IIS Node.js module** si no lo tenés:  
   https://github.com/Azure/iisnode

2. Copiá toda la carpeta del proyecto a una carpeta dentro de `C:\inetpub\wwwroot`.

3. Agregá un archivo `web.config` en la raíz con este contenido:

```xml
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="core.js" verb="*" modules="iisnode"/>
    </handlers>

    <rewrite>
      <rules>
        <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
          <match url="^core.js\/debug[\/]?" />
          <action type="Rewrite" url="http://localhost:8080/core.js/debug" />
        </rule>

        <rule name="StaticContent">
          <action type="Rewrite" url="public/index.html" />
        </rule>
      </rules>
    </rewrite>

    <defaultDocument>
      <files>
        <add value="index.html"/>
      </files>
    </defaultDocument>

    <iisnode node_env="production" />
  </system.webServer>
</configuration>
```

4. Asegurate de que IIS tenga permisos sobre la carpeta.

5. Accedé desde tu navegador a `http://localhost/nombreDelProyecto`.

---

## 👨‍💻 Autor

By Nahuel Brunel.  
🛠️ Para uso interno de soporte técnico.
