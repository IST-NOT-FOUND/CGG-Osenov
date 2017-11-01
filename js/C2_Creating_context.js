var gl=null; // контекст WebGL

window.onload=function(){
        // получаем элемент canvas
        var canvas = document.getElementById("canvas3D");
        try {
            // Сначала пытаемся получить стандартный контекст
            // Если не получится, обращаемся к экспериментальному контексту
            gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch(e) {}

        // Если контекст не удалось получить, выводим сообщение
        if (!gl) {
            alert("Ваш браузер не поддерживает WebGL");
        }
        if(gl){
            // покрасим в серый цвет фон
            gl.clearColor(0.5, 0.5, 0.5, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
    }