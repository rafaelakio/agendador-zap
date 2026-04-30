# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-04-30

### Adicionado
- ✨ Sistema completo de agendamento de mensagens WhatsApp
- 📱 Seletor de contatos da agenda do telefone
- 📅 Seletor de data e hora para agendamento
- 🔔 Sistema de notificações com Notifee
- 💾 Armazenamento local com AsyncStorage
- 🎨 Interface moderna com React Native Paper
- 📝 Edição e exclusão de mensagens agendadas
- ✅ Visualização de status (pendente/enviada/falhou)
- 🔄 Pull-to-refresh na lista de mensagens
- 🚀 Envio imediato de mensagens agendadas
- 📊 Ordenação inteligente por status e data
- 🔐 Sistema completo de permissões Android
- 🌐 Integração com WhatsApp via deep linking
- 📱 Suporte a Android 7.0+ (API 24+)
- 🎯 Formatação automática de números de telefone brasileiros
- ⏰ Notificações no horário exato agendado
- 🔄 Reagendamento após reinicialização do dispositivo
- 📝 Validação de formulários
- 🎨 Tema Material Design
- 📱 Responsivo e adaptável

### Componentes Implementados
- `HomeScreen`: Tela principal com lista de mensagens
- `AddMessageScreen`: Tela de adicionar/editar mensagens
- `MessageItem`: Card de mensagem com ações
- `ContactPicker`: Seletor de contatos com busca
- `DateTimePicker`: Seletor de data e hora
- `FloatingButton`: Botão de ação flutuante

### Serviços Implementados
- `storageService`: Gerenciamento de armazenamento local
- `notificationService`: Agendamento e gerenciamento de notificações
- `whatsappService`: Integração com WhatsApp
- `permissionService`: Gerenciamento de permissões Android

### Contextos Implementados
- `MessagesContext`: Estado global de mensagens

### Utilitários Implementados
- `dateUtils`: Formatação e manipulação de datas

### Configurações
- Configuração completa do Android
- AndroidManifest.xml com todas as permissões
- Gradle build files
- ProGuard rules
- TypeScript configuration
- ESLint e Prettier

### Documentação
- README.md completo com instruções de uso
- DEVELOPMENT.md com guia técnico detalhado
- PLAN.md com especificações do projeto
- Comentários inline no código
- Tipos TypeScript documentados

### Segurança
- Validação de inputs
- Permissões granulares
- Tratamento de erros
- Logs de debug

### Performance
- Lazy loading de componentes
- FlatList otimizada
- Memoization de componentes
- Hermes engine habilitado

## [Unreleased]

### Planejado para Próximas Versões

#### [1.1.0]
- Templates de mensagens
- Mensagens recorrentes (diárias, semanais, mensais)
- Suporte a grupos do WhatsApp
- Histórico detalhado de mensagens enviadas
- Estatísticas de uso

#### [1.2.0]
- Backup na nuvem (Firebase/Google Drive)
- Múltiplos destinatários por mensagem
- Anexos (imagens, documentos, áudios)
- Temas personalizáveis
- Modo escuro

#### [1.3.0]
- Suporte a iOS
- Sincronização entre dispositivos
- Widget para tela inicial
- Atalhos rápidos
- Integração com calendário

#### [2.0.0]
- Reescrita com React Native 0.75+
- Nova arquitetura (Fabric)
- TurboModules
- Melhorias de performance
- UI/UX redesenhada

### Melhorias Futuras
- [ ] Testes unitários completos
- [ ] Testes E2E com Detox
- [ ] CI/CD com GitHub Actions
- [ ] Análise de código com SonarQube
- [ ] Monitoramento com Firebase Analytics
- [ ] Crash reporting com Crashlytics
- [ ] A/B testing
- [ ] Internacionalização (i18n)
- [ ] Acessibilidade melhorada
- [ ] Suporte a tablets

### Bugs Conhecidos
- Android 12+: Restrições de alarmes exatos requerem configuração manual
- Alguns dispositivos Samsung podem ter otimização de bateria agressiva
- WhatsApp Business pode ter comportamento ligeiramente diferente

---

## Tipos de Mudanças

- `Adicionado` para novas funcionalidades
- `Modificado` para mudanças em funcionalidades existentes
- `Descontinuado` para funcionalidades que serão removidas
- `Removido` para funcionalidades removidas
- `Corrigido` para correções de bugs
- `Segurança` para vulnerabilidades corrigidas

## Links

- [1.0.0]: https://github.com/seu-usuario/agendador-zap/releases/tag/v1.0.0