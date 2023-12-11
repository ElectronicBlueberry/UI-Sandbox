# UI Sandbox

A simple and fast minimal framework for teaching vue+ts.
UI Sandbox allows you to define multiple interactive sandboxes to teach using pre-built scenarios.

Runs on vite, and a minimal express backend for managing files.

## How to use UI Sandbox

Requires Node.js version 20.10.0 or higher.

On Windows, requires [Microsoft Visual C++ Redistributable 2015+](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170#visual-studio-2015-2017-2019-and-2022).

1. Clone this repository
   ```sh
   git clone https://github.com/ElectronicBlueberry/UI-Sandbox.git
   ```
2. Install dependencies
   ```sh
   npm i
   ```
3. Run
   ```sh
   npm run main
   ```
4. Open
   ```sh
   http://localhost:8000/
   ```

## How to add a Custom Sandbox

You can create a new template using the command:

```bash
npm run new -- my_template
```

Alternatively, you can manually create a folder in `src/templates` with the name of your sandbox in snake_case.

Add a `meta.json` file, containing category and order.

Example:

```json
{
    "category": "Basics",
    "order": 5
}
```

The order does not have to be sequential.

Create a sub-folder called `template`, and inside a file called `Index.vue`.
Anything inside this `template` folder will later be copied to the sandbox.

If you add a new category, you can define it in `src/templates/categories.json`,
to set it's order relative to other categories.

Also create a `hint.md` and `test.ts` file.

The contents of the hint file will be shown in a popup if the `hint` button is pressed in a sandbox.

The default export function of the test file will be ran when the `test` button is pressed in a sandbox.
It should throw an error if the test fails, otherwise resolve to void.

Your folder structure should now look something like this:

```bash
templates
├── categories.json
└── your_sandbox
    ├── hint.md
    ├── meta.json
    ├── test.ts
    └── template
        └── Index.vue
```

## Template Mode

When developing new sandboxes, you can run UI-Sandbox in template mode,
to see your template changes directly instead of a new sandbox being created
from your template every time you navigate to it.

To do so use:

```bash
npm run template-dev
```

instead of `npm run main`
