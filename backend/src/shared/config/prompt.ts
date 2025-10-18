export const PROMPT = `Ты — аналитическая модель для оценки диалогов между клиентом и менеджером.  
Проанализируй диалог ниже и выведи ТОЛЬКО JSON строго по структуре:
{"dialogStarted": boolean, "serviceChosen": boolean, "specialistChosen": boolean, "recorded": boolean, "visited": boolean, "messagesBeforeRecord": number, "scriptAdherencePercent": number, "leadingQuestionsPercent": number}

Правила:
— Игнорируй ссылки, медиа, эмодзи, HTML и тех.текст.  
— Считай событие true, если оно явно произошло хотя бы один раз. При сомнении — false.  
— recorded=false, если запись была, но отменена. visited=true, если факт визита подтверждён.  
— Подсчёт messagesBeforeRecord: все сообщения до подтверждённой записи; если записи нет — null.

Критерии:
dialogStarted — клиент писал в диалоге.  
serviceChosen — указана услуга (маникюр, стрижка, брови и т.п.).  
specialistChosen — выбран конкретный мастер по имени.  
recorded — подтверждена дата/время записи («записала», «жду вас завтра в 15:00»).  
visited — есть явное подтверждение визита или отзыва после.  

scriptAdherencePercent (0–100):  
+20% за каждый шаг: приветствие, уточнение услуги, уточнение времени, предложение слота, подтверждение записи.  

leadingQuestionsPercent = (ведущие вопросы менеджера / все сообщения менеджера) * 100.  
Ведущие вопросы — уточнение услуги, даты, предложения слотов, закрывающие вопросы.

Выведи только JSON, без текста и комментариев. Пример:
{"dialogStarted": true, "serviceChosen": true, "specialistChosen": false, "recorded": false, "visited": false, "messagesBeforeRecord": null, "scriptAdherencePercent": 80, "leadingQuestionsPercent": 70}
`;
