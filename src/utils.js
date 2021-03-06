const zip = window.zip;

export const pipe = (g, f) => (x) => f(g(x));

export function getReaderFromXHR(url) {
  const request = new XMLHttpRequest();
  const promise = new Promise((resolve, reject) => {
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = function () {
      resolve(request.response);
    };
    request.send();
  });
  return { request, promise };
}

export async function getTextFromEntry(entry) {
  return new Promise((resolve, reject) => {
    entry.getData(new zip.TextWriter(), resolve);
  });
}

export async function getBlobFromEntry(entry) {
  if (entry == null || entry.getData == null) {
    console.warn('entry is missing');
  }
  return new Promise((resolve, reject) => {
    try {
      entry.getData(new zip.BlobWriter(), resolve);
    } catch (error) {
      reject();
    }
  });
}

export function getEntriesFromBlob(blob) {
  return new Promise((resolve, reject) => {
    window.zip.createReader(
      new zip.BlobReader(blob),
      (zipReader) => {
        zipReader.getEntries(resolve);
      },
      reject
    );
  });
}

export function getEntriesFromXHR(file) {
  const { request, promise: readerPromise } = getReaderFromXHR(file);

  const promise = readerPromise.then(
    (blob) =>
      new Promise((resolve, reject) => {
        window.zip.createReader(
          new zip.BlobReader(blob),
          (zipReader) => {
            zipReader.getEntries(resolve);
          },
          reject
        );
      })
  );
  return [request, promise];
}

export async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(blob);
  });
}

export function getResourceHref(resource) {
  const resourceHrefAttribute = resource.getAttribute('href');
  if (resourceHrefAttribute) {
    return resourceHrefAttribute;
  }
  const fileNode = resource.querySelector('file');
  const fileNodeHrefAttribute =
    fileNode != null && fileNode.getAttribute('href');
  if (fileNodeHrefAttribute) {
    return fileNodeHrefAttribute;
  }
  return null;
}

export function getExtension(uri) {
  return uri.split('.').pop();
}

export function parseXml(xml) {
  const parser = new DOMParser();
  return parser.parseFromString(xml, 'text/xml');
}

export function getAssignmentSettingsHref(identifier) {
  return `${identifier}/assignment_settings.xml`;
}

export function getAssignmentListResources(resources) {
  return resources
    .filter((node) => node.querySelector('file'))
    .map((node) => ({
      identifier: node.getAttribute('identifier'),
      href: node.querySelector('file').getAttribute('href'),
      dependencyHrefs: Array.from(node.querySelectorAll('dependency')).map(
        (node) => {
          const identifier = node.getAttribute('identifierref');
          const resource = this.props.resourceMap.get(identifier);
          return getResourceHref(resource);
        }
      ),
    }));
}
