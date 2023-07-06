import Link, { LinkProps } from 'next/link'
import React, { Children } from 'react'

import { useRouter } from 'next/router'

interface IActiveLink extends LinkProps {
  children: JSX.Element
  activeClassName: string
}

export const ActiveLink: React.FC<IActiveLink> = (ac) => {
  const { children, activeClassName, ...props } = ac
  const { pathname } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className

  const className =
    pathname === props.href
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link href={props.href as string}>
      {React.cloneElement(child as any, {
        className: className || null
      })}
    </Link>
  )
}
