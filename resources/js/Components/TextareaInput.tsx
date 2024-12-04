import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function TextareaInput(
  {
    className = "",
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <textarea
      {...props}
      rows={5}
      className={
        "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 " +
        className
      }
      ref={localRef}
    ></textarea>
  );
});