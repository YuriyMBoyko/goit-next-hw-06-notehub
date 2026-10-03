# 06-notehub-nextjs

  - Cтворено репозиторій `06-notehub-nextjs`.
  - При здачі роботи надаються два посилання: на вихідні файли (репозиторій) та на робочу сторінку завдання, розгорнуту на [Vercel](https://vercel.com/).
  - Проєкт створено за допомогою Next.js (App Router).
  - Усі компоненти, які не прив'язані безпосередньо до маршруту та їх частин, зберігаються в папці `components`, кожен – у власній папці з такою ж назвою як і компонет, та з файлами:

    1. файл компонента з розширенням `.tsx` (наприклад, `Header.tsx`);
    2. файл стилів з такою самою назвою, що й компонент, з розширенням `.module.css` (наприклад, `Header.module.css`).

  - Загальні типи та інтерфейси винесені до файлу `types/note.ts`.
  - Функції роботи з API винесені в `lib/api/` у вигляді окремих модулів.
  - Для HTTP-запитів використовується бібліотека `axios`.
  - Стан запитів у CSR-компонентах керується через `TanStack Query` (React Query).
  - Усі компоненти типізовані з використанням `TypeScript`.
  - Код має бути відформатований за допомогою `Prettier`.
  - Стилізація – за допомогою CSS Modules.
  - У проєкті реалізована підтримка SSR та CSR, відповідно до завдання.


## Додаток NoteHub

У попередньому (5-му) домашньому завданні було створено застосунок `NoteHub`. Тепер настав час виконати його рефакторинг: перенести проєкт на `Next.js`, реалізувати багатосторінкову структуру та адаптувати застосунок до нової архітектури. Після виконання завдання застосунок повинен працювати та виглядати наступним чином 
```
https://goitlmsstorage.b-cdn.net/57e0a5cd-e108-45eb-b136-f3aade970da8NoteHub%20-%206hw.mp4
```


## Структура сторінок

У попередній версії NoteHub був односторінковим додатком (SPA). Тепер потрібно реалізувати багатосторінкову структуру з використанням маршрутизації Next.js. У додатку мають бути реалізовані такі маршрути:
  - `/` – головна сторінка з загальною інформацією про застосунок.
  - `/notes` – сторінка списку нотатків. На цій сторінці відображається перелік усіх створених нотаток. Реалізовано функцію пошуку за ключовим словом, а також можливість створення нової нотатки.
  - `/notes/[id]` – сторінка деталей однієї нотатки (динамічний маршрут). На цій сторінці відображається повна інформація про одну нотатку за її id.


## Головна сторінка

Додайте на головну сторінку вашого додатка загальну інформацію про нього:
```
<main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Welcome to NoteHub</h1>
    <p className={css.description}>
      NoteHub is a simple and efficient application designed for managing
      personal notes. It helps keep your thoughts organized and accessible
      in one place, whether you are at home or on the go.
    </p>
    <p className={css.description}>
      The app provides a clean interface for writing, editing, and browsing
      notes. With support for keyword search and structured organization,
      NoteHub offers a streamlined experience for anyone who values clarity
      and productivity.
    </p>
  </div>
</main>
```
```
Стилі для всіх компонентів і сторінок вже створені. Скопіюй їх із цього репозиторію: https://github.com/goitacademy/react-notehub-styles/tree/hw-06. Після створення своїх сторінок і компонентів скопіюй відповідні .module.css файли у відповідні папки вашого проєкту.
```


## Глобальний Layout

Усі сторінки вашого додатка повинні мати спільний хедер і футер.

Створи для цього компоненти:
  - `Header` – має містити навігацію з лінками на сторінки `Home` та `Notes`.
  - `Footer` – має містити контактну інформацію розробника застосунку.
  - `TanStackProvider` – компонент для підключення QueryClientProvider та забезпечення роботи TanStack Query у всьому застосунку.

Компонент `Header` має створювати наступну розмітку. Для створення посилань в навігації використовуй готовий компонент `Link` від `Next.js`.
```
  <header className={css.header}>
    <a href="/" aria-label="Home">
      NoteHub
    </a>
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/notes">Notes</a>
        </li>
      </ul>
    </nav>
  </header>
```
Компонент `Footer` має створювати наступну розмітку:
```
  <footer className={css.footer}>
    <div className={css.content}>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={css.wrap}>
        <p>Developer: your name</p>
        <p>
          Contact us:
          <a href="<mailto:student@notehub.app>">student@notehub.app</a>
        </p>
      </div>
    </div>
  </footer>
```
Додайте `TanStackProvider`:
  - Створіть у `components/TanStackProvider/TanStackProvider.tsx` компонент, який додає `QueryClientProvider`.
  - Підключіть `TanStackProvider` глобально в `app/layout.tsx`.
  - Також у `app/layout.tsx` підключіть компоненти `Header` та `Footer`, щоб вони відображалися на всіх сторінках застосунку.


## API-запити

У цій домашній роботі ми продовжуємо працювати з бекендом, який використовували в попередній ДЗ.
```
https://notehub-public.goit.study/api/docs
```
Весь вміст файлу `src/services/noteService.ts` з попередньої ДЗ перенесіть у файл `lib/api.ts`.

Зверніть увагу, що `env` змінні в Next.js отримуються дещо інакше ніж було в Vite і є вимога щодо назви `env` змінної. Змінна має починатись з `NEXT_PUBLIC`, тому перейменуйте її на `NEXT_PUBLIC_NOTEHUB_TOKEN`. Також для отримання значення цієї змінної вам потрібно замість `import.meta.env.VITE_NOTEHUB_TOKEN` використовувати `process.env.NEXT_PUBLIC_NOTEHUB_TOKEN`.


## Компоненти

Усі компоненти, створені в попередній домашній роботі, перенесіть у папку components.

Не забудьте також перенести в проєкт файл types/note.ts.

```
! Зверніть увагу: папки components, types та lib повинні знаходитися окремо від директорії app
```


## Сторінка списку нотаток

Весь вміст компонента `App` з попередньої ДЗ перенесіть на сторінку `/notes`

Реалізуйте сторінковий компонент Notes у маршруті `/notes` як SSR-компонент, де заздалегідь виконується prefetch (попереднє завантаження даних через TanStack Query) з гідратацією кешу.

Усю клієнтську логіку (отримання списку нотаток за допомогою useQuery та їх відображення) винесіть в окремий файл компонента `app/notes/Notes.client.tsx`.


## Сторінка з деталями однієї нотатки

Внесіть зміни у розмітку компонента `NoteList`, який відповідає за відображення списку нотаток. До картки однієї нотатки додайте посилання `View details` перед кнопкою `Delete`. Це посилання повинно вести на сторінку з деталями конкретної нотатки `/notes/${note.id}`.

У файлі `lib\api.ts` створіть функцію `fetchNoteById` для отримання деталей однієї нотатки за її ідентифікатором. Для цього використовуйте відповідний ендпоінт бекенду, описаний у документації API.

Створіть динамічний маршрут `/notes/[id]` для сторінки з деталями однієї нотатки за її `id`.

Реалізуйте сторінковий компонент `NoteDetails` у маршруті `/notes/[id]` як SSR-компонент, де заздалегідь виконується prefetch (попереднє завантаження даних через TanStack Query) з гідратацією кеша. Для отримання динамічного `id` у серверному компоненті використовуйте `params`, які Next.js автоматично передає пропсом в сторінковий компонент маршруту.

Усю клієнтську логіку (отримання даних нотатки за допомгою `useQuery` та їх відображення) винесіть в окремий файл компонента `app/notes/[id]/NoteDetails.client.tsx`. Для отримання динамічного `id` в клієнтському компоненті використовуйте хук `useParams()`.
```
! Не забудьте додати в useQuery опцію: refetchOnMount: false щоб уникнути повторного запиту на клієнті після гідратації.
```
Обов'язково у клієнтському компоненті NoteDetailsClient опрацюйте стани `isLoading` та `isError` які надає useQuery та випадок коли детальну інформацію про нотатку не вдалося отримати. Поки що буде достатньо повернути наступну розмітку:
```
// isLoading
<p>Loading, please wait...</p>

// isError, !note
<p>Something went wrong.</p>;
```
Якщо нотатку за переданим `id` було знайдено, то компонент `NoteDetailsClient` має створювати наступну розмітку:
```
<main className={css.main}>	
  <div className={css.container}>
    <div className={css.item}>
      <div className={css.header}>
        <h2>Note title</h2>
      </div>
      <p className={css.tag}>{note.tag}</p>
      <p className={css.content}>Note content</p>
      <p className={css.date}>Created date</p>
    </div>
  </div>
</main>
```


## Обробка помилок і завантаження маршрутів

Реалізуйте обробку стану завантаження у файлі `loading.tsx`.

Буде достатньо створити один файл `loading.tsx` в корені папки `app`, щоб використовувати спільний loading-стан для всіх маршрутів застосунку. Реалізувати у ньому створення наступної розмітки:
```
<p>Loading, please wait...</p>
```
Реалізуйте обробку помилок для маршруту `/notes` у файлі `error.tsx`. Буде достатньо в ньому створити наступну розмітку, описавши суть помилки:
```
<p>Could not fetch the list of notes. {error.message}</p>
```
Реалізуйте обробку помилок для маршруту `/notes/[id]` у файлі `error.tsx`. Буде достатньо в ньому створити наступну розмітку, описавши суть помилки:
```
<p>Could not fetch note details. {error.message}</p>
```
```
! Для перевірки коректної роботи error.tsx можна штучно створити помилку за допомогою: throw new Error('Error message');

Наприклад, тимчасово додайте цей код у компонент сторінки /notes або /notes/[id] та переконайтеся, що користувачу відображається fallback-інтерфейс помилки.
```
