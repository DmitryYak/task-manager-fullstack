// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('/'); // BASE_URL из конфига
// });

// test('добавление новой задачи', async ({ page }) => {
//   const taskInput = page.getByPlaceholder('Введите задачу...');
//   const addBtn = page.getByRole('button', { name: 'Добавить' });
//   const taskList = page.locator('#taskList');

//   await taskInput.fill('Новая задача');
//   await addBtn.click();

//   await expect(taskList).toContainText('Новая задача');
// });

// test('редактирование задачи через модалку', async ({ page }) => {
//   const taskList = page.locator('#taskList');
//   const firstEditBtn = taskList.locator('.edit-btn').first();

//   await firstEditBtn.click();

//   const editInput = page.getByPlaceholder('Новое название задачи');
//   const saveBtn = page.getByRole('button', { name: 'Сохранить' });

//   await editInput.fill('Задача изменена');
//   await saveBtn.click();

//   await expect(taskList).toContainText('Задача изменена');
// });

// test('удаление задачи', async ({ page }) => {
//   const taskList = page.locator('#taskList');
//   const firstDeleteBtn = taskList.locator('.delete-btn').first();

//   // Перехват confirm
//   page.on('dialog', (dialog) => dialog.accept());

//   await firstDeleteBtn.click();

//   await expect(taskList.locator('li')).toHaveCount(0); // если был 1 элемент
// });

// test('отметка задачи выполненной', async ({ page }) => {
//   const taskList = page.locator('#taskList');
//   const firstToggleBtn = taskList.locator('.toggle-btn').first();
//   const firstTask = taskList.locator('li').first();

//   await firstToggleBtn.click();

//   await expect(firstTask).toHaveClass(/completed/);
// });

// test('проверка ссылок футера', async ({ page }) => {
//   const russLink = page.locator('#russLink');
//   const wbLink = page.locator('#wbLink');

//   await expect(russLink).toHaveAttribute('href', 'https://www.russoutdoor.ru/');
//   await expect(wbLink).toHaveAttribute('href', 'https://www.wildberries.ru/');
// });

import {test, expect} from '@playwright/test';

test.describe('check 1 Task manager UI', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/')
    })

    test(`expect main page elements`, async ({page}) => {
        await expect(page.getByText('Task Manager')).toBeVisible()
    })
})

//pick locator: 
// getByRole('heading', { name: 'Task Manager' })
// getByRole('textbox', { name: 'Введите задачу' })
// test('test', async ({ page }) => {
//   await expect(page.getByRole('button', { name: 'Добавить' })).toBeVisible();
// });

// getByRole('button', { name: 'Добавить' })
// getByRole('button', { name: '✓' }).first()
// getByRole('listitem').filter({ hasText: 'купить молоко ✓ ✏️ ❌' }).getByLabel('Редактировать задачу')
// getByRole('button', { name: '❌' }).first()
// getByText('Made by Dmitry Yakovlev')
// getByRole('link', { name: '🌐 Russ Outdoor' })
// getByRole('link', { name: '🛒 Wildberries' })


// test('test', async ({ page }) => {
//   await expect(page.getByRole('button', { name: 'Добавить' })).toBeVisible();
//   await expect(page.getByRole('button', { name: '✓' }).first()).toBeVisible();
//   await expect(page.getByRole('listitem').filter({ hasText: 'купить молоко ✓ ✏️ ❌' }).getByLabel('Редактировать задачу')).toBeVisible();
//   await expect(page.getByRole('button', { name: '❌' }).first()).toBeVisible();
//   await expect(page.getByText('Made by Dmitry Yakovlev')).toBeVisible();
//   await expect(page.getByRole('link', { name: '🌐 Russ Outdoor' })).toBeVisible();
//   await expect(page.getByRole('link', { name: '🛒 Wildberries' })).toBeVisible();
//   await expect(page.getByRole('heading')).toContainText('Task Manager');
//   await expect(page.locator('#taskList')).toContainText('✓');
//   await expect(page.locator('#taskList')).toContainText('✏️');
//   await expect(page.locator('#taskList')).toContainText('❌');
//   await expect(page.getByRole('paragraph')).toContainText('Made by Dmitry Yakovlev');
//   await expect(page.locator('#russLink')).toContainText('🌐 Russ Outdoor');
//   await expect(page.locator('#wbLink')).toContainText('🛒 Wildberries');
//   await expect(page.getByRole('textbox', { name: 'Введите задачу' })).toBeEmpty();
//   await page.getByRole('textbox', { name: 'Введите задачу' }).click();
//   await page.getByRole('textbox', { name: 'Введите задачу' }).fill('sdfsdf');
//   await expect(page.getByRole('textbox', { name: 'Введите задачу' })).toHaveValue('sdfsdf');
//   await expect(page.getByRole('heading')).toMatchAriaSnapshot(`- heading "Task Manager" [level=1]`);
//   await expect(page.locator('#addBtn')).toMatchAriaSnapshot(`- button "Добавить"`);
//   await expect(page.locator('#taskList')).toMatchAriaSnapshot(`
//     - listitem:
//       - text: купить молоко
//       - button "✓"
//       - button "Редактировать задачу"
//       - button "❌"
//     `);
//   await expect(page.locator('#taskList')).toMatchAriaSnapshot(`- button "✓"`);
//   await expect(page.locator('#taskList')).toMatchAriaSnapshot(`- button "Редактировать задачу"`);
//   await expect(page.locator('#taskList')).toMatchAriaSnapshot(`- button "❌"`);
//   await expect(page.getByRole('paragraph')).toMatchAriaSnapshot(`
//     - paragraph:
//       - text: Made by
//       - strong: Dmitry Yakovlev
//     `);
//   await expect(page.locator('#russLink')).toMatchAriaSnapshot(`
//     - link "🌐 Russ Outdoor":
//       - /url: https://www.russoutdoor.ru/
//     `);
//   await expect(page.locator('#wbLink')).toMatchAriaSnapshot(`
//     - link "🛒 Wildberries":
//       - /url: https://www.wildberries.ru/
//     `);
});