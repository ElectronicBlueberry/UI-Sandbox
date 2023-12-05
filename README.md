# UI Sandbox

A simple and fast minimal framework for teaching vue+ts.
UI Sandbox allows you to define multiple interactive sandboxes to teach using different scenarios.

Runs on vite, and a minimal express backend for managing files.

## How to use UI Sandbox

Requires Node.js version 20.10.0 or higher.

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

In `src/sandbox_templates` create a folder with the name of your sandbox in snake_case.

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

If you add a new category, you can define it in `src/sandbox_templates/categories.json`,
to set it's order relative to other categories.

Your folder structure should look something like this:

```bash
sandbox_templates
├── categories.json
└── your_sandbox
    ├── meta.json
    └── template
        └── Index.vue
```
