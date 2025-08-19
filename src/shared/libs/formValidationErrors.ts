import { tuiValidationErrorsProvider } from '@taiga-ui/kit';

export const formValidationErrors = tuiValidationErrorsProvider({
  required: 'Поле обязательно для заполнения',
  maxlength: ({ requiredLength }) => `Максимальная длина ${requiredLength}`,
  minlength: ({ requiredLength }) => `Минимальная длина ${requiredLength}`,
});
