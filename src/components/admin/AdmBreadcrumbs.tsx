import { Breadcrumbs, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'
import { RoutesPath } from '@app/config'
import { useRouter } from 'next/router'

interface ICrumbs {
  href: string
  name: string
}

interface IAdmBreadcrumbs {
  children?: React.ReactNode
}

export const AdmBreadcrumbs: React.FC<IAdmBreadcrumbs> = (props) => {
  const [crumbs, setCrumbs] = useState<ICrumbs[]>()
  const router = useRouter()

  useEffect(() => {
    const spl = router.pathname.split('/')

    let curUrl = ''
    const reslut: ICrumbs[] = []
    for (const sp of spl) {
      curUrl = curUrl + sp + '/'
      const c: ICrumbs = {
        href: curUrl,
        name: sp.toUpperCase()
      }
      reslut.push(c)
    }
    setCrumbs(reslut)
  }, [router])

  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: 10 }}>
            {crumbs &&
              crumbs.map((v, k) => {
                return (
                  <Link key={k} href={v.href}>
                    {v.name}
                  </Link>
                )
              })}
          </Breadcrumbs>
        </Grid>
        {props.children && <Grid item>{props.children}</Grid>}
        {router.pathname !== RoutesPath.ADMIN.INDEX && !props.children && (
          <Grid item>
            <a
              style={{ textDecoration: 'underline' }}
              onClick={() => router.back()}>
              กลับ
            </a>
          </Grid>
        )}
      </Grid>
    </>
  )
}
