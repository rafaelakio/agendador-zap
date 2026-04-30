# 🚀 Guia de Configuração Rápida - Agendador Zap

Este guia irá ajudá-lo a configurar o projeto do zero em poucos minutos.

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [ ] Node.js 18+ ([Download](https://nodejs.org/))
- [ ] Java JDK 11+ ([Download](https://www.oracle.com/java/technologies/downloads/))
- [ ] Android Studio ([Download](https://developer.android.com/studio))
- [ ] Git ([Download](https://git-scm.com/))

## 📱 Configuração do Android Studio

### 1. Instalar Android Studio

1. Baixe e instale o Android Studio
2. Durante a instalação, certifique-se de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

### 2. Configurar Android SDK

1. Abra Android Studio
2. Vá em `Tools > SDK Manager`
3. Na aba `SDK Platforms`, instale:
   - Android 13.0 (Tiramisu) - API Level 33
   - Android 7.0 (Nougat) - API Level 24

4. Na aba `SDK Tools`, instale:
   - Android SDK Build-Tools 33.0.0
   - Android Emulator
   - Android SDK Platform-Tools
   - Intel x86 Emulator Accelerator (HAXM)

### 3. Configurar Variáveis de Ambiente

#### Windows

```powershell
# Adicione ao Path do Sistema
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin"
```

#### macOS/Linux

Adicione ao `~/.bashrc` ou `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Depois execute:
```bash
source ~/.bashrc  # ou ~/.zshrc
```

### 4. Criar um Emulador Android

1. Abra Android Studio
2. Vá em `Tools > Device Manager`
3. Clique em `Create Device`
4. Escolha um dispositivo (ex: Pixel 5)
5. Selecione uma imagem do sistema (API 33 recomendado)
6. Finalize a criação

## 🔧 Configuração do Projeto

### 1. Clonar o Repositório

```bash
git clone <repository-url>
cd agendador-zap
```

### 2. Instalar Dependências

```bash
npm install
```

Ou se preferir Yarn:

```bash
yarn install
```

### 3. Verificar Instalação

```bash
# Verificar Node.js
node --version  # Deve ser 18+

# Verificar npm
npm --version

# Verificar Java
java -version  # Deve ser 11+

# Verificar Android SDK
adb version
```

## 🏃 Executar o Projeto

### Opção 1: Usando Emulador

1. Inicie o emulador Android:
   - Abra Android Studio
   - Vá em `Tools > Device Manager`
   - Clique em ▶️ no emulador desejado

2. Em um terminal, inicie o Metro Bundler:
```bash
npm start
```

3. Em outro terminal, execute o app:
```bash
npm run android
```

### Opção 2: Usando Dispositivo Físico

1. Habilite o modo desenvolvedor no seu Android:
   - Vá em `Configurações > Sobre o telefone`
   - Toque 7 vezes em `Número da versão`

2. Habilite a depuração USB:
   - Vá em `Configurações > Opções do desenvolvedor`
   - Ative `Depuração USB`

3. Conecte o dispositivo via USB

4. Verifique se o dispositivo foi detectado:
```bash
adb devices
```

5. Execute o app:
```bash
npm run android
```

## 🔍 Solução de Problemas Comuns

### Erro: "SDK location not found"

**Solução**: Crie o arquivo `android/local.properties`:

```properties
sdk.dir=C:\\Users\\SeuUsuario\\AppData\\Local\\Android\\Sdk
```

(No macOS/Linux: `/Users/SeuUsuario/Library/Android/sdk`)

### Erro: "Unable to load script"

**Solução**: Limpe o cache e reinicie:

```bash
npm start -- --reset-cache
```

### Erro: "INSTALL_FAILED_INSUFFICIENT_STORAGE"

**Solução**: Libere espaço no dispositivo/emulador ou aumente o tamanho do AVD.

### Erro: "Execution failed for task ':app:installDebug'"

**Solução**: 

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Erro de Permissões no Linux

**Solução**:

```bash
sudo chmod +x android/gradlew
```

### Metro Bundler não inicia

**Solução**:

```bash
# Mate processos do Metro
npx react-native start --reset-cache

# Ou manualmente
lsof -ti:8081 | xargs kill -9
```

## 📦 Dependências Principais

O projeto usa as seguintes bibliotecas principais:

```json
{
  "react": "18.2.0",
  "react-native": "0.73.0",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "react-native-paper": "^5.11.0",
  "@notifee/react-native": "^7.8.0",
  "react-native-contacts": "^7.0.8",
  "@react-native-community/datetimepicker": "^7.6.1",
  "@react-native-async-storage/async-storage": "^1.21.0"
}
```

## 🧪 Testar Funcionalidades

### 1. Testar Permissões

Ao abrir o app pela primeira vez, você deve ver solicitações de:
- Acesso aos contatos
- Permissão de notificações
- Alarmes exatos (Android 12+)

### 2. Testar Agendamento

1. Toque no botão "+" (Nova Mensagem)
2. Selecione um contato
3. Digite uma mensagem de teste
4. Agende para 1 minuto no futuro
5. Toque em "Agendar"
6. Aguarde a notificação aparecer

### 3. Testar Integração WhatsApp

1. Certifique-se de ter o WhatsApp instalado
2. Quando a notificação aparecer, toque nela
3. O WhatsApp deve abrir com a mensagem pré-preenchida

## 🎨 Personalização

### Alterar Nome do App

1. Edite `android/app/src/main/res/values/strings.xml`:
```xml
<string name="app_name">Seu Nome</string>
```

2. Edite `package.json`:
```json
{
  "name": "seu-nome-app"
}
```

### Alterar Ícone do App

1. Gere ícones em diferentes tamanhos
2. Substitua os arquivos em `android/app/src/main/res/mipmap-*/`

### Alterar Cores do Tema

Edite `App.tsx` e os componentes para usar suas cores preferidas.

## 📚 Próximos Passos

Após a configuração bem-sucedida:

1. ✅ Leia o [README.md](README.md) para entender as funcionalidades
2. ✅ Consulte o [DEVELOPMENT.md](DEVELOPMENT.md) para detalhes técnicos
3. ✅ Veja o [PLAN.md](PLAN.md) para a arquitetura do projeto
4. ✅ Explore o código-fonte em `src/`

## 🆘 Precisa de Ajuda?

- 📖 Documentação React Native: https://reactnative.dev/
- 💬 Stack Overflow: https://stackoverflow.com/questions/tagged/react-native
- 🐛 Issues do Projeto: [GitHub Issues]

## ✅ Checklist de Configuração

- [ ] Node.js instalado e funcionando
- [ ] Java JDK instalado
- [ ] Android Studio configurado
- [ ] Android SDK instalado
- [ ] Variáveis de ambiente configuradas
- [ ] Emulador ou dispositivo conectado
- [ ] Dependências do projeto instaladas
- [ ] App executando com sucesso
- [ ] Permissões concedidas
- [ ] WhatsApp instalado no dispositivo
- [ ] Teste de agendamento realizado

---

**Parabéns! 🎉** Seu ambiente está configurado e pronto para desenvolvimento!