// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
// Симулятор обновления iOS
// GitHub: NIK-dev001

let webView = new WebView()

let html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            min-height: 100vh;
            background: #000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
            padding: 20px;
            position: relative;
        }
        
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(0);
        }
        .content.completed { transform: translateY(-40px); }
        
        .apple-logo {
            font-size: 100px;
            color: #fff;
            margin-bottom: 40px;
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .version-text {
            color: #8e8e93;
            font-size: 18px;
            font-weight: 400;
            letter-spacing: 0.5px;
            margin-bottom: 30px;
        }
        
        /* Прогресс-бар контейнер — теперь под версией, не в самом верху */
        .progress-container {
            width: 80%;
            height: 6px;
            background: #1c1c1e;
            border: 1px solid #fff;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 40px;
            position: relative;
        }
        
        /* Белый прогресс — идёт первым */
        .progress-white {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background: #fff;
            transition: width 60s linear;
            z-index: 1;
        }
        .progress-white.fill { width: 100%; }
        
        /* Чёрный прогресс — идёт вторым, поверх белого */
        .progress-black {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 0%;
            background: #000;
            transition: width 60s linear;
            z-index: 2;
        }
        .progress-black.fill { width: 100%; }
        
        .success-message {
            color: #fff;
            font-size: 24px;
            font-weight: 500;
            margin-top: 10px;
            opacity: 0;
            transition: opacity 0.8s ease;
        }
        .success-message.show { opacity: 1; }
        
        .ok-button {
            position: fixed;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            background: #007AFF;
            color: #fff;
            border: none;
            border-radius: 12px;
            padding: 14px 60px;
            font-size: 18px;
            font-weight: 600;
            font-family: inherit;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.5s ease;
            box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
        }
        .ok-button.show { opacity: 1; }
        .ok-button:active {
            background: #0056b3;
            transform: translateX(-50%) scale(0.98);
        }
    </style>
</head>
<body>
    <div class="content" id="content">
        <div class="apple-logo" id="appleLogo"></div>
        <div class="version-text">iOS 27.9 Beta 2</div>
        
        <!-- Прогресс-бар теперь здесь — под яблоком и версией -->
        <div class="progress-container">
            <div class="progress-white" id="progressWhite"></div>
            <div class="progress-black" id="progressBlack"></div>
        </div>
        
        <div class="success-message" id="successMessage">Success</div>
    </div>
    
    <button class="ok-button" id="okButton">OK</button>
    
    <script>
        const progressWhite = document.getElementById('progressWhite');
        const progressBlack = document.getElementById('progressBlack');
        const content = document.getElementById('content');
        const successMessage = document.getElementById('successMessage');
        const okButton = document.getElementById('okButton');
        
        // ЭТАП 1: Белый заполняется за 60 секунд (1 минута)
        setTimeout(() => {
            progressWhite.classList.add('fill');
        }, 100);
        
        // ЭТАП 2: Чёрный начинает заполняться через 60 секунд (после белого)
        setTimeout(() => {
            progressBlack.classList.add('fill');
        }, 60100);
        
        // ЭТАП 3: Когда чёрный заполнится (ещё 60 секунд), финал
        setTimeout(() => {
            content.classList.add('completed');
            
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 400);
            
            setTimeout(() => {
                okButton.classList.add('show');
            }, 800);
            
        }, 120100);
        
        okButton.addEventListener('click', () => {
            okButton.textContent = "Готово";
            okButton.style.opacity = "0.7";
        });
    </script>
</body>
</html>`

webView.loadHTML(html)
webView.present()