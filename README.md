# Filters

[![License](https://img.shields.io/badge/license-MIT-10b981.svg)](https://github.com/enso-ui/filters/blob/master/LICENSE)
[![Stable](https://img.shields.io/badge/stable-3.3.6-2563eb.svg)](https://www.npmjs.com/package/@enso-ui/filters)
[![Downloads](https://img.shields.io/npm/dm/@enso-ui/filters.svg)](https://www.npmjs.com/package/@enso-ui/filters)
[![Vue](https://img.shields.io/badge/vue-3.x-42b883.svg)](https://vuejs.org/)
[![JavaScript](https://img.shields.io/badge/javascript-ES2020-f7df1e.svg)](https://developer.mozilla.org/docs/Web/JavaScript)
[![SCSS](https://img.shields.io/badge/scss-supported-c6538c.svg)](https://sass-lang.com/)
[![npm](https://img.shields.io/badge/npm-package-cb3837.svg)](https://www.npmjs.com/package/@enso-ui/filters)
[![Issues](https://img.shields.io/github/issues/enso-ui/filters.svg)](https://github.com/enso-ui/filters/issues)
[![Merge Requests](https://img.shields.io/github/issues-pr/enso-ui/filters.svg)](https://github.com/enso-ui/filters/pulls)

## Description

Filters provides renderless filter state primitives together with Bulma and Enso wrappers for table, list, and dashboard filtering.

## Installation

Install the package:

```bash
yarn add @enso-ui/filters
```

The components can be used in Enso tables or in standalone Vue applications.

## Features

- exports Bulma filter widgets such as `InputFilter`, `DateFilter`, `IntervalFilter`, `SelectFilter`, `ToggleFilter`, and `BooleanFilter`
- ships Enso-aware wrappers that plug directly into table and dashboard filter payloads
- includes renderless primitives such as `FilterState`, `CoreInputFilter`, `CoreDateFilter`, and `CoreIntervalFilter`
- bundles interval helpers for named presets such as today, this week, and similar quick ranges

## Usage

```vue
<script setup>
import { InputFilter, DateFilter } from '@enso-ui/filters/bulma';
</script>

<InputFilter name="query" placeholder="Search" />
<DateFilter name="created_at" />
```

## API

### Bulma exports

Import: `@enso-ui/filters/bulma`

Public components:
- `InputFilter`
- `DateFilter`
- `IntervalFilter`
- `SelectFilter`
- `ToggleFilter`
- `BooleanFilter`
- `VueFilter`
- `EnsoFilter`
- `EnsoInputFilter`
- `EnsoDateFilter`
- `EnsoIntervalFilter`
- `EnsoSelectFilter`
- `EnsoToggleFilter`

Common props across the Bulma wrappers:
- `name: string | null = null` filter key emitted back to the parent state.
- `instant: boolean = false` apply the filter immediately instead of waiting for an explicit confirm.
- `transform: Function = value => value` value normalizer before the filter state is updated.

Component-specific additions:
- `InputFilter` adds `placeholder = ""`.
- `DateFilter` adds `nullable = false` and date-picker specific options.
- `IntervalFilter` adds `minLabel = "Min"` and `maxLabel = "Max"`.
- `SelectFilter` and `BaseSelectFilter` support select-specific options such as multiselect mode.
- `ToggleFilter` emits `change` and `update:modelValue` and supports nullable boolean states.

### Renderless primitives

Common imports:
- `@enso-ui/filters/src/renderless/FilterState.vue`
- `@enso-ui/filters/src/renderless/CoreInputFilter.vue`
- `@enso-ui/filters/src/renderless/CoreDateFilter.vue`
- `@enso-ui/filters/src/renderless/CoreIntervalFilter.vue`
- `@enso-ui/filters/src/renderless/intervals.js`

Key contracts:
- `FilterState` emits `ready` and `state-updated` when the shared filter bag is initialized or changed.
- `CoreInputFilter` emits `update:modelValue`.
- `CoreDateFilter` emits `update:filter` and `update:interval`.
- `CoreIntervalFilter` emits `change` and `update:modelValue`.

## Depends On

- [`@enso-ui/datepicker`](https://docs.laravel-enso.com/frontend/datepicker.html) [↗](https://github.com/enso-ui/datepicker)
- [`@enso-ui/select`](https://docs.laravel-enso.com/frontend/select.html) [↗](https://github.com/enso-ui/select)
- [`@enso-ui/strings`](https://docs.laravel-enso.com/frontend/strings.html) [↗](https://github.com/enso-ui/strings)
- [`@enso-ui/vue-switch`](https://docs.laravel-enso.com/frontend/switch.html) [↗](https://github.com/enso-ui/switch)
- [`@enso-ui/transitions`](https://docs.laravel-enso.com/frontend/transitions.html) [↗](https://github.com/enso-ui/transitions)
- [`@enso-ui/ui`](https://docs.laravel-enso.com/frontend/ui.html) [↗](https://github.com/enso-ui/ui)

## Contributions

are welcome. Pull requests are great, but issues are good too.

Thank you to all the people who already contributed to Enso!

## License

[MIT](https://github.com/enso-ui/filters/blob/master/LICENSE)

